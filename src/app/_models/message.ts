export interface Message {
  id: number;
  senderId: number;
  senderUserName: string;
  senderPhotoUrl: string;
  recipientId: number;
  recipientUserName: string;
  receipientPhotoUrl: string;
  content: string;
  dateRead?: Date;
  dateSend: Date;
}
