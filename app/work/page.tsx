import SelectedWorkExplorer from "@/components/SelectedWorkExplorer";
import {pageMetadata} from "@/lib/metadata";
export const metadata=pageMetadata("Work","Projects, experiments, research, and case studies.","/work");
export default function WorkPage(){return <main className="page section-pad work-hybrid-page"><header className="work-hybrid-intro"><h1>A little of everything.</h1><p>Selected projects, curious experiments, and ideas brought to life.</p></header><SelectedWorkExplorer /></main>}
