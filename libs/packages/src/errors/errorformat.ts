import { NotFoundException, ConflictException, BadRequestException, UnauthorizedException, ForbiddenException, ServiceUnavailableException, InternalServerErrorException } from '@nestjs/common';
import { status } from '@grpc/grpc-js';

export function handleGrpcError(error: any) {
  console.error('gRPC Error:', error);
  switch (error.code) {
     
    case status.NOT_FOUND:
      throw new NotFoundException(error.message);
    case status.ALREADY_EXISTS:
      throw new ConflictException(error.message);
    case status.INVALID_ARGUMENT:
      throw new BadRequestException(error.message);
    case status.UNAUTHENTICATED:
      throw new UnauthorizedException(error.message);
    case status.PERMISSION_DENIED:
      throw new ForbiddenException(error.message);
    case status.UNAVAILABLE:
      throw new ServiceUnavailableException('Service is currently unavailable');
    default:
      throw new InternalServerErrorException('Something went wrong');
  }
}