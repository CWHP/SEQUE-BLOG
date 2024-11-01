import Project from "../models/article.js";

/* PROJECT OVERVIEW */
export const renderBlog = async (req, res) => {
  try {
    const projects = await Project.findAll();
    res.render("home", { projects: projects, isLoggedIn: global.isLoggedIn });
  } catch (error) {
    console.error(error);
    res.status(500).redirect("/error");
  }
};

export const renderEditArticle = async (req, res) => {
  try {
    const project = await Project.findByPk(req.params.id);
    if (project) {
      res.render("edit-article", {
        project: project,
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
    const { projectTitle, projectType, overview } = req.body;
    const image = req.file.destination + "/" + req.file.filename;
    const id = req.params.id;

    const project = await Project.findByPk(id);

    if (!project) {
      return res.status(404).send("Not found");
    }

    project.projectTitle = projectTitle;
    project.projectType = projectType;
    project.overview = overview;
    project.image = image;

    await project.save();

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
    const { projectTitle, projectType, overview } = req.body;
    const image = req.file.destination + "/" + req.file.filename;
    await Project.create({
      projectTitle,
      projectType,
      overview,
      image,
    });
    res.redirect("/");
  } catch (error) {
    console.error(error);
    res.status(500).redirect("/error");
  }
};

export const deleteArticle = async (req, res) => {
  try {
    await Project.destroy({ where: { id: req.params.id } });
    res.redirect("/");
  } catch (error) {
    console.error(error);
    res.send(500).redirect("/error");
  }
};

/* ARTICLE CONTENT */
export const renderArticleContent = async (req, res) => {
  try {
    res.status(200).send("DetailPage");
  } catch (error) {
    console.error(error);
    res.status(500).redirect("/error");
  }
};

export const renderEditArticleContent = async (req, res) => {
  try {
    res.status(200).send("EditProjectDetailPage");
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
