// tslint:disable max-classes-per-file

import { IsNumberString, IsOptional } from 'class-validator';

export interface UserLikesDto {
  limit: number;
  page: number;
}

export class UserLikesPaginationOptionsDto {
  @IsNumberString()
  @IsOptional()
  readonly limit?: string;

  @IsNumberString()
  @IsOptional()
  readonly page?: string;
}

export class UserLikesPaginationResultsDto {
  results: UserLikesDto[];
  page: number;
  limit: number;
}
