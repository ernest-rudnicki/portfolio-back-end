import { Project, ProjectModel } from "@entities/Project";
import { ProjectTranslationsModel } from "@entities/ProjectTranslations";
import { Role } from "@utils/types";
import { Arg, Authorized, ID, Mutation, Resolver } from "type-graphql";
import { UpdateProjectInput } from "./input/UpdateProjectInput";

@Resolver()
export class UpdateProjectResolver {
  @Authorized([Role.ADMINISTRATOR])
  @Mutation(() => Project)
  async updateProject(
    @Arg("data") data: UpdateProjectInput,
    @Arg("id", () => ID) id: string
  ) {
    const { description, ...project } = data;
    const updatedProject = await ProjectModel.findByIdAndUpdate(id, {
      ...project,
    });

    if (!updatedProject) {
      throw Error("There is no project with such id");
    }

    await ProjectTranslationsModel.findByIdAndUpdate(
      updatedProject.description,
      { ...description }
    );

    const populatedProject = await updatedProject.populate([
      "tags",
      "description",
    ]);
    return populatedProject;
  }
}
