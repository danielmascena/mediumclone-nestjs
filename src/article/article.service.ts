import { Injectable } from "@nestjs/common";
import { CreateArticleDTO } from "./dto/createArticle.dto";
import { ArticleEntity } from "./article.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UserEntity } from "@app/user/user.entity";
import { ArticleResponseInterface } from "./types/articleResponse.interface";
import slugify from "slugify";

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
        article.slug = this.getSlug(article.title);
        return await this.articleRepository.save(article);
    }

    buildArticleResponse(article: ArticleEntity): ArticleResponseInterface {
        return { article};
    }

    private getSlug(title: string): string {
        return slugify(title, {lower: true}) + '-' + ((Math.random() * Math.pow(36, 6)) | 0).toString(36);
    }
}