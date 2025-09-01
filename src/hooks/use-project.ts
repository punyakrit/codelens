import { api } from "@/trpc/react";
import  {useLocalStorage} from "usehooks-ts";
export default function useProject() {
    const { data: projects } = api.project.getProjects.useQuery();
    const [selectedProjectId, setSelectedProjectId] = useLocalStorage("selectedProjectId", "");
    const project = projects?.find((project) => project.id === selectedProjectId);

    return {
        projects,
        selectedProjectId,
        setSelectedProjectId,
        project,
    }
}