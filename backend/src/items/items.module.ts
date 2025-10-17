// ...existing code...
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItemsService } from './items.service';
import { ItemsController } from './items.controller';
import { WorkItem } from './work-item.entity';

@Module({
  imports: [TypeOrmModule.forFeature([WorkItem])],
  controllers: [ItemsController],
  providers: [ItemsService],
})
export class ItemsModule {}
// ...existing code...
