export interface UserLikesDto {
  limit: number;
  page: number;
}

export interface UserLikesPaginationOptionsDto {
  limit?: number;
  page?: number;
}

export interface UserLikesPaginationResultsDto {
  results: UserLikesDto[];
  page: number;
  limit: number;
}
