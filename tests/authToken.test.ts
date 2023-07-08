require("dotenv").config(); // Load environment variables from .env file

import axios, { AxiosResponse, AxiosRequestConfig } from "axios";
import {
  AuthToken,
  getAuthToken,
  isTokenExpired,
} from "../src/Auth/tokenRetriever";
jest.mock('axios');

describe('getAuthToken', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return a valid authentication token', async () => {
    // Mock the axios.post method to return a response with the access token and expiration time
    const mockResponse = {
      data: {
        access_token: 'mock-access-token',
        expires_in: 3600, // Expires in 1 hour
        token_type: 'bearer',
      },
    };
    (axios.post as jest.Mock).mockResolvedValueOnce(mockResponse);

    const authToken: AuthToken = await getAuthToken();

    expect(authToken.access_token).toBe('mock-access-token');
    expect(authToken.expires_in).toBeGreaterThan(Math.floor(Date.now() / 1000));
    expect(authToken.token_type).toBe('bearer');
    expect(isTokenExpired(authToken)).toBe(false);
    expect(axios.post).toHaveBeenCalledTimes(1);
    expect(axios.post).toHaveBeenCalledWith(
      'https://id.twitch.tv/oauth2/token',
      null,
      expect.objectContaining({
        params: {
          client_id: expect.any(String),
          client_secret: expect.any(String),
          grant_type: 'client_credentials',
        },
      })
    );
  });

  // Add more test cases as needed
});

describe('isTokenExpired', () => {
  it('should return true if the token has expired', () => {
    const expiredToken: AuthToken = {
      access_token: 'mock-access-token',
      expires_in: Math.floor(Date.now() / 1000) - 3600, // Expired 1 hour ago
      token_type: 'bearer',
    };

    const result = isTokenExpired(expiredToken);

    expect(result).toBe(true);
  });

  it('should return false if the token has not expired', () => {
    const validToken: AuthToken = {
      access_token: 'mock-access-token',
      expires_in: Math.floor(Date.now() / 1000) + 3600, // Expires in 1 hour
      token_type: 'bearer',
    };

    const result = isTokenExpired(validToken);

    expect(result).toBe(false);
  });

  // Add more test cases as needed
});