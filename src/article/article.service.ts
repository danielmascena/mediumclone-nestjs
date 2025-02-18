import { Injectable } from "@nestjs/common";
import { CreateArticleDTO } from "./dto/createArticle.dto";
import { ArticleEntity } from "./article.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UserEntity } from "@app/user/user.entity";

@Injectable()
export class ArticleService {

    constructor(@InjectRepository(ArticleEntity) private readonly articleRepository: Repository<ArticleEntity>) {}

    async createArticle(user: UserEntity, createArticleDTO: CreateArticleDTO): Promise<ArticleEntity> {
        const article = new ArticleEntity();
        Object.assign(article, createArticleDTO);
        article.tagList ??= [];
        /*
        if (!article.tagList) {
            article.tagList = [];
        }
        */
        article.author = user;
        article.slug = 'slug';
        return await this.articleRepository.save(article);
    }
}