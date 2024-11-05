import Article from "../models/article.js";

/* PROJECT OVERVIEW */
export const renderBlog = async (req, res) => {
  try {
    const articles = await Article.findAll();
    res.render("home", { articles: articles, isLoggedIn: global.isLoggedIn });
  } catch (error) {
    console.error(error);
    res.status(500).redirect("/error");
  }
};

export const renderEditArticle = async (req, res) => {
  try {
    const article = await Article.findByPk(req.params.id);
    if (article) {
      res.render("edit-article", {
        article: article,
        isLoggedIn: global.isLoggedIn,
      });
    } else {
      res.redirect("/");
    }
  } catch (error) {
    console.error(error);
    res.status(500).redirect("/error");
  }
};

export const editArticle = async (req, res) => {
  try {
    const { title, category, overview, content } = req.body;
    const image = req.file.destination + "/" + req.file.filename;
    const id = req.params.id;

    const article = await Article.findByPk(id);

    if (!article) {
      return res.status(404).send("Not found");
    }

    article.title = title;
    article.category = category;
    article.overview = overview;
    article.image = image;
    article.content = content;

    await article.save();

    res.redirect("/");
  } catch (error) {
    console.error(error);
    res.status(500).redirect("/error");
  }
};

export const renderAddArticle = (req, res) => {
  try {
    res.render("add-article", { isLoggedIn: global.isLoggedIn });
  } catch (error) {
    console.error(error);
    res.status(500).redirect("/error");
  }
};

export const addArticle = async (req, res) => {
  try {
    const { title, category, overview } = req.body;
    let { content } = req.body;
    const image = req.file.destination + "/" + req.file.filename;
    content = "a";
    await Article.create({
      title,
      category,
      overview,
      image,
      content,
    });
    res.redirect("/");
  } catch (error) {
    console.error(error);
    res.status(500).redirect("/error");
  }
};

export const deleteArticle = async (req, res) => {
  try {
    await Article.destroy({ where: { id: req.params.id } });
    res.redirect("/");
  } catch (error) {
    console.error(error);
    res.send(500).redirect("/error");
  }
};

/* ARTICLE CONTENT */
export const renderArticleContent = async (req, res) => {
  try {
    res.render("detail");
  } catch (error) {
    console.error(error);
    res.status(500).redirect("/error");
  }
};

export const renderEditArticleContent = async (req, res) => {
  try {
    res.render("edit-detail");
  } catch (error) {
    console.error(error);
    res.status(500).redirect("/error");
  }
};

export const editArticleContent = async (req, res) => {
  try {
    res.send(200).send("EditProjectDetail");
  } catch (error) {
    res.status(500).redirect("/error");
  }
};
