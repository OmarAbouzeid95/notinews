export interface notificationapiEmail {
  notificationId: string;
  user: {
    id: string;
    email: string;
    number?: string;
  };
  mergeTags: {
    [key: string]: string;
  };
}
