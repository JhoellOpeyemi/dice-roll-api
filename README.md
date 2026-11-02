# Dice Roll API

A simple full-stack app that rolls dice through a serverless API. The front end lets users choose the number of dice and sides, while the back end handles the random roll logic and returns the result.

This project is a lightweight example of building a modern frontend with a serverless AWS backend.

## Tech Stack

- Frontend: React, TypeScript, Vite
- Backend: Node.js, AWS Lambda
- API layer: Amazon API Gateway
- Infrastructure: AWS Serverless Application Model (AWS SAM)
- Styling: CSS

## AWS Services Used

- AWS Lambda: Runs the dice-roll logic
- Amazon API Gateway: Exposes the `/roll` endpoint
- AWS SAM: Defines and deploys the serverless application

## Project Structure

```text
api/
  lambda/
  template.yaml
frontend/
  src/
  public/
```

## Local Development

### Frontend

```bash
cd frontend
npm install
npm run dev
```

### Backend

```bash
cd api
sam build
sam deploy --guided
```

## Example

The app accepts query parameters like:

```text
/roll?sides=20&count=3
```

and returns a JSON response with the dice rolls, total, and a message.
