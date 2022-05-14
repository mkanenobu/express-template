import type { Handler, NextFunction } from "express";
import httpMocks from "node-mocks-http";

export const mockNextFunction: NextFunction = () => null;

export const handlerTester = (
  handler: Handler,
  requestOptions: httpMocks.RequestOptions,
  responseOptions?: httpMocks.ResponseOptions
) => {
  const mockRequest = httpMocks.createRequest(requestOptions);
  const mockResponse = httpMocks.createResponse(responseOptions);

  handler(mockRequest, mockResponse, mockNextFunction);

  return {
    mockRequest,
    mockResponse,
    responseBody: mockResponse._getData(),
    responseStatus: mockResponse.statusCode,
  };
};
