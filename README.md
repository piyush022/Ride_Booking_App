# 🚖 Ride Booking API (Uber Clone Backend)

A **Node.js-powered Ride Booking API** – an **Uber Clone backend** with real-time ride management, Redis queues, and MongoDB integration.  
This project is ideal for learning or building **ride-sharing, taxi booking, and Uber-like apps** with robust **scalable architecture**.  

## Features

- **RESTful API** for ride booking operations
- **Real-time notifications** using job queues
- **MongoDB** integration with Mongoose ODM
- **Redis** for caching and queue management
- **BullMQ** for background job processing
- **Zod** schema validation
- **Comprehensive error handling** and logging
- **CORS** enabled for cross-origin requests

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB (Mongoose)
- **Cache/Queue**: Redis (IORedis)
- **Job Queue**: BullMQ
- **Validation**: Zod
- **Logging**: Morgan
- **Environment**: dotenv

## ⚙️ Prerequisites
Make sure you have the following installed:
- [Node.js](https://nodejs.org/) (v14 or higher)  
- [MongoDB](https://www.mongodb.com/)  
- [Redis](https://redis.io/)  


## Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd rideBooking
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:
   Create a `.env` file in the root directory with the following variables:

```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/ridebooking
REDIS_URL=redis://localhost:6379
NODE_ENV=development
REDIS_PORT=6379
REDIS_HOST=localhost
```

4. Start MongoDB and Redis services on your system.

## Usage

### Development

```bash
npm start
```

The server will start on the port specified in your environment variables (default: 7071).

### API Endpoints

The API is available at `/api` base path. Main endpoints include:

- **Riders**: `/api/riders` - Rider management
- **Rides**: `/api/rides` - Ride booking and management

## Environment Variables

| Variable      | Description               | Default     |
| ------------- | ------------------------- | ----------- |
| `PORT`        | Server port               | 7071        |
| `MONGODB_URI` | MongoDB connection string | -           |
| `REDIS_URL`   | Redis connection string   | -           |
| `NODE_ENV`    | Environment mode          | development |

## Error Handling

The application includes comprehensive error handling:

- Global error handler for unhandled errors
- Custom error classes for different error types
- Structured error responses
- Request logging with Morgan

## Background Jobs

The application uses BullMQ for handling background jobs:

- Job queues for asynchronous processing
- Worker processes for job execution
- Redis-backed job persistence

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.
