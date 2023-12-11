import { ExternalMessage } from './external-message.interface';

export interface InternalMessage extends ExternalMessage {
  authorFirstName: string;
  authorLastName: string;
  messageId: string;
  text: string;
  messageDate: string;
}
