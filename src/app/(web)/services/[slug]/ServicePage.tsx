import { PageBuilderSerializer } from "@/components/pageBuilder/Serializers";
import { servicePageSchema } from "../queries";
import z from "zod";

const CaseStudyPage = ({ page }: { page: z.infer<typeof servicePageSchema>[0] }) => {

  return ( 
    <main>
      {page.pageBuilder.map((item, index) => (
        <PageBuilderSerializer component={item} />
      ))}
    </main>
   );
}
 
export default CaseStudyPage;