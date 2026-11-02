export const handler = async (event) => {
  // API Gateway passes query string params (?sides=20&count=3) through the event object.
  const params = event.queryStringParameters || {};
  // Default to a standard 6-sided die if we don't get a value for sides.
  const sides = parseInt(params.sides) || 6;
  // Default to 1 die if count is not provided.
  const count = parseInt(params.count) || 1;

  // A 1-sided die isn't a die, and anything more than 100 sides is just chaos. We'll return a client error.
  if (sides < 2 || sides > 100) {
    return {
      statusCode: 400,
      headers: {
          "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        error: "Sides must be between 2 and 100.",
      }),
    };
  }

  // Count must be between 1 and 50.
  if (count < 1 || count > 50) {
    return {
      statusCode: 400,
      headers: {
          "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        error: "Count must be between 1 and 50.",
      }),
    };
  }

  // Roll the die `count` times and collect the results.
  const rolls = Array.from(
    { length: count },
    () => Math.floor(Math.random() * sides) + 1,
  );

  const total = rolls.reduce((sum, r) => sum + r, 0);

  // The minimum possible total is count*1, the maximum is count*sides.
  // Express the result as a percentage of the achievable range.
  const minTotal = count;
  const maxTotal = count * sides;
  const percentage = (total - minTotal) / (maxTotal - minTotal);

  let message;
  if (percentage >= 0.75) {
    message = "You rock!";
  } else if (percentage < 0.25) {
    message = "My grandma can roll better.";
  } else {
    message = "Decent. You can do better.";
  }

  // Lambda functions behind API Gateway return this shape:
  // statusCode, headers, and a stringified body
  return {
    statusCode: 200,
    headers: {
        "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      sides,
      count,
      rolls,
      total,
      message,
    }),
  };
};
