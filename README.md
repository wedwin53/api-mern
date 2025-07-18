# MERN Stack API

A RESTful API built with Node.js, Express, and MongoDB for user authentication and management. This project serves as the backend for a MERN (MongoDB, Express, React, Node.js) stack application.

## 🚀 Features

- **User Authentication**: JWT-based authentication system
- **User Registration**: Secure user registration with password hashing
- **Password Security**: bcrypt encryption for password storage
- **Environment Configuration**: Support for development and production environments
- **Database Integration**: MongoDB with Mongoose ODM
- **API Documentation**: RESTful API endpoints
- **Error Handling**: Comprehensive error handling and validation
- **CORS Support**: Cross-origin resource sharing enabled
- **Health Checks**: Application health monitoring endpoints

## 🏗️ Project Architecture

```mermaid
graph TB
    Client[Client Application] --> API[Express API Server]
    
    API --> MW[Middleware Layer]
    MW --> CORS[CORS]
    MW --> JWT[JWT Authentication]
    MW --> LOG[Morgan Logger]
    MW --> JSON[JSON Parser]
    
    API --> Routes[Route Layer]
    Routes --> HealthRoute[Health Routes]
    Routes --> UserRoute[User Routes]
    Routes --> AuthRoute[Auth Routes]
    
    Routes --> Controllers[Controller Layer]
    Controllers --> HealthCtrl[Health Controller]
    Controllers --> UserCtrl[User Controller]
    Controllers --> AuthCtrl[Auth Controller]
    
    Controllers --> Models[Model Layer]
    Models --> UserModel[User Model]
    
    Models --> DB[(MongoDB Database)]
    
    API --> Config[Configuration]
    Config --> DevConfig[Development Config]
    Config --> ProdConfig[Production Config]
    
    Controllers --> Repositories[Repository Layer]
    Repositories --> DBConn[Database Connection]
    DBConn --> DB
    
    classDef api fill:#e1f5fe
    classDef middleware fill:#f3e5f5
    classDef routes fill:#e8f5e8
    classDef controllers fill:#fff3e0
    classDef models fill:#fce4ec
    classDef database fill:#e0f2f1
    classDef config fill:#fff8e1
    
    class API api
    class MW,CORS,JWT,LOG,JSON middleware
    class Routes,HealthRoute,UserRoute,AuthRoute routes
    class Controllers,HealthCtrl,UserCtrl,AuthCtrl controllers
    class Models,UserModel models
    class DB,DBConn database
    class Config,DevConfig,ProdConfig config
```

## 📋 Prerequisites

- Node.js (v14 or higher)
- MongoDB Atlas account or local MongoDB installation
- npm or yarn package manager

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/wedwin53/api-mern.git
   cd api-mern
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment**
   - Create configuration files in the `config` directory
   - Update MongoDB connection string in `config/development.json`
   - Set your JWT secret key

4. **Environment Configuration**
   ```json
   {
     "port": 5000,
     "enviroment": "development",
     "jwt_secret": "your_super_secure_secret_key",
     "data_base": {
       "mongo_uri": "mongodb+srv://username:password@cluster.mongodb.net/database?retryWrites=true&w=majority"
     }
   }
   ```

## 🚀 Getting Started

### Development Mode
```bash
npm run dev
```

### Production Mode
```bash
npm start
```

The server will start on the configured port (default: 5000) and connect to MongoDB.

## 📚 API Endpoints

### Authentication Endpoints

#### Register User
```http
POST /api/v1/users/create
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword123"
}
```

**Response:**
```json
{
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  },
  "msj": "User Created"
}
```

#### Login User
```http
POST /api/v1/secure/auth
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "securepassword123"
}
```

**Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Health Check Endpoints

#### Basic Health Check
```http
GET /api/v1/health/
```

**Response:**
```
It Works
```

#### Detailed Health Check
```http
GET /api/v1/health/check
Authorization: Bearer <your-jwt-token>
```

## 🔐 Authentication

This API uses JWT (JSON Web Tokens) for authentication. Protected routes require a valid JWT token in the Authorization header:

```http
Authorization: Bearer <your-jwt-token>
```

**Protected Routes:**
- All routes except `/api/v1/secure/auth` and `/api/v1/health`

## 📁 Project Structure

```
api-mern/
├── config/                 # Configuration files
│   ├── default.json        # Default configuration
│   ├── development.json    # Development environment
│   └── prod.json          # Production environment
├── controllers/           # Route controllers
│   ├── auth.controller.js # Authentication logic
│   ├── health.controller.js # Health check logic
│   └── users.controller.js # User management logic
├── models/               # Database models
│   └── user.model.js    # User schema
├── repositories/        # Database layer
│   └── db.js           # MongoDB connection
├── routes/             # API routes
│   ├── health.route.js # Health check routes
│   ├── secure.route.js # Authentication routes
│   └── user.route.js   # User routes
├── index.js            # Application entry point
├── package.json        # Dependencies and scripts
└── README.md          # Project documentation
```

## 🛡️ Security Features

- **Password Hashing**: bcrypt with salt rounds
- **JWT Authentication**: Secure token-based authentication
- **Input Validation**: Request validation and sanitization
- **CORS Protection**: Configurable cross-origin resource sharing
- **Environment Variables**: Secure configuration management

## 🔧 Environment Variables

Create appropriate configuration files in the `config` directory:

| Variable | Description | Default |
|----------|-------------|---------|
| `port` | Server port | 5000 |
| `enviroment` | Environment name | development |
| `jwt_secret` | JWT signing secret | - |
| `data_base.mongo_uri` | MongoDB connection string | - |

## 🐛 Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   - Verify MongoDB connection string
   - Check network connectivity
   - Ensure MongoDB cluster is running

2. **JWT Authentication Error**
   - Verify JWT secret is configured
   - Check token expiration (default: 1 hour)
   - Ensure proper Authorization header format

3. **Port Already in Use**
   - Change port in configuration file
   - Kill existing processes on the port

## 🧪 Testing

Currently, no test suite is configured. To run tests:

```bash
npm test
```

## 📈 Performance Considerations

- **Database Indexes**: Consider adding indexes for frequently queried fields
- **Rate Limiting**: Implement rate limiting for production use
- **Caching**: Add Redis or memory caching for improved performance
- **Input Validation**: Implement comprehensive input validation

## 🚀 Deployment

### Docker Deployment
```dockerfile
# Create a Dockerfile for containerization
FROM node:16-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 5000
CMD ["npm", "start"]
```

### Environment Setup
- Configure production MongoDB cluster
- Set secure JWT secret
- Enable HTTPS in production
- Configure proper CORS origins

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License.

## 🔗 Related Projects

- Frontend React application (coming soon)
- Admin dashboard (coming soon)

## 📞 Support

For support and questions:
- Create an issue in the GitHub repository
- Contact the development team

---

**Built with ❤️ using the MERN stack**