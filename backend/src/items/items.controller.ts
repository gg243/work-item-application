// src/items/items.controller.ts
import { Controller, Get, Post, Body } from '@nestjs/common';
import { ItemsService } from './items.service';
import { CreateWorkItemDto } from './dto/create-work-item.dto';

@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Post()
  create(@Body() createWorkItemDto: CreateWorkItemDto) {
    return this.itemsService.create(createWorkItemDto);
  }

  @Get()
  findAll() {
    return this.itemsService.findAll();
  }
}
