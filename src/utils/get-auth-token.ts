export function getAuthorizationToken(headers: any): string {
  if (headers?.authorization) {
    const parted: string = headers.authorization.split(' ');
    if (parted.length === 2) {
      return parted[1];
    }
  }
}
