import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WorkItem } from './work-item.entity';
import { CreateWorkItemDto } from './dto/create-work-item.dto';

@Injectable()
export class ItemsService {
  constructor(
    @InjectRepository(WorkItem)
    private readonly workItemRepo: Repository<WorkItem>,
  ) {}

  async create(dto: CreateWorkItemDto): Promise<WorkItem> {
    const item = this.workItemRepo.create({
      title: dto.title,
      description: dto.description,
      createdBy: dto.createdBy || 'system',
    });
    return await this.workItemRepo.save(item);
  }

  async findAll(): Promise<WorkItem[]> {
    return this.workItemRepo.find();
  }
}
