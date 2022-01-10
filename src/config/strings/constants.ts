export const CONSTANTS = {
  LOG_HEADER: 'M0rpheu5',
  STATUS: {
    OK: 200,
    CREATED: 201,
    ACCEPTED: 202,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    TOO_MANY_REQUESTS: 429,
    INTERNAL_SERVER_ERROR: 500,
  },
  FILENAME: {
    LOG: {
      COMBINED: 'combined.log',
      EXCEPTIONS: 'exceptions.log',
    },
  },
  MESSAGES: {
    ERROR: {
      DEFAULT_TEXT: 'Error occurred',
      INVALID_JSON: 'Invalid JSON in request',
      PAYLOAD_SIZE_EXCEEDED: 'Request Payload size exceeded',
      TOKEN_REQUIRED: 'Authentication token is required!',
      INVALID_AUTH_TOKEN: 'Invalid Authentication token. Please request a new one',
      TOKEN_EXPIRED: 'Authentication token expired. Please request a new one',
      TOKEN_BEFORE_ACTIVE: 'Authentication token not active yet. Please request a new one',
    },
    API_WORKING: 'Service API is working!',
    ENDPOINT_NOT_FOUND: 'Endpoint not found!',
    ALREADY_SUBSCRIBED: 'Already subscribed!',
  },
  ENUMS: {
    SUBSCRIPTION_TIER: {
      FREE: 'FREE',
      GOLD: 'GOLD',
      SILVER: 'SILVER',
    },
  },
  BODY_PARSER_LIMIT: '1mb',
  JWT_SECRET: process.env.JWT_SECRET || 'T1ke1tLOL123!',
  CURRENT_ENVIRONMENT: process.env.NODE_ENV || 'development',
  TIER_CONFIG: [
    {
      name: 'GOLD',
      RequestsPerHr: 100,
    },
    {
      name: 'SILVER',
      RequestsPerHr: 10,
    },
    {
      name: 'FREE',
      RequestsPerHr: 5,
    },
  ],
};
