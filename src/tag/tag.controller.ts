import { Controller, Get } from '@nestjs/common';
import { TagService } from '@app/tag/tag.service';
import { TagEntity } from './tag.entity';

@Controller('tags')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @Get()
  async findAll(): Promise<{ tags: string[] }> {
    const res = await this.tagService.findAll();
    /**
     * Response shape
     * {
     * "tags": [
     * "reactjs",
     * "angularjs"
     * ]
     * }
     */
    /*
    return res.reduce<{ tags: string[] }>(
      (acc, cur) => (acc.tags.push(cur.name), acc),
      { tags: [] },
    );
      */
    return {
      tags: res.map(({ name }) => name),
    };
  }
}
