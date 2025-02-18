import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { ArticleService } from "./article.service";
import { AuthGuard } from "@app/user/guards/auth.guard";
import { User } from "@app/user/decorators/user.decorator";
import { CreateArticleDTO } from "./dto/createArticle.dto";
import { UserEntity } from "@app/user/user.entity";

@Controller('articles')
export class ArticleController {

    constructor(private readonly articleService: ArticleService) {}

    @Post()
    @UseGuards(AuthGuard)
    async create(@User() user: UserEntity, @Body('article') createArticleDTO: CreateArticleDTO): Promise<any> {
        return await this.articleService.createArticle(user, createArticleDTO);
    }

    @Get()
    findAll() { 
        return 'This action returns all articles';
    }
}