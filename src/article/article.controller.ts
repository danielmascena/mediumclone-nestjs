import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { ArticleService } from "./article.service";
import { AuthGuard } from "@app/user/guards/auth.guard";
import { User } from "@app/user/decorators/user.decorator";
import { CreateArticleDTO } from "./dto/createArticle.dto";
import { UserEntity } from "@app/user/user.entity";
import { ArticleResponseInterface } from "./types/articleResponse.interface";

@Controller('articles')
export class ArticleController {

    constructor(private readonly articleService: ArticleService) {}

    @Post()
    @UseGuards(AuthGuard)
    async create(@User() user: UserEntity, @Body('article') createArticleDTO: CreateArticleDTO): Promise<ArticleResponseInterface> {
        const article = await this.articleService.createArticle(user, createArticleDTO);
        return this.articleService.buildArticleResponse(article);
    }

    @Get()
    findAll() { 
        return 'This action returns all articles';
    }
}