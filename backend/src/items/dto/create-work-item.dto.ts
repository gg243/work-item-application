export class CreateWorkItemDto {
  title: string;
  description: string;
  createdBy?: string; // optional for now
}
