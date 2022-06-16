import { Project, ProjectModel } from "@entities/Project";
import { ProjectTranslationsModel } from "@entities/ProjectTranslations";
import { Role } from "@utils/types";
import { Arg, Authorized, Mutation, Resolver } from "type-graphql";
import { CreateProjectInput } from "./input/CreateProjectInput";

@Resolver()
export class CreateProjectResolver {
  @Authorized([Role.ADMINISTRATOR])
  @Mutation(() => Project)
  async createProject(@Arg("data") data: CreateProjectInput) {
    const { description, ...project } = data;
    const projectDescription = await ProjectTranslationsModel.create(
      description
    );

    const savedProject = await ProjectModel.create({
      ...project,
      description: projectDescription.id,
    });

    const populatedProject = await savedProject.populate([
      "tags",
      "description",
    ]);
    return populatedProject;
  }
}
