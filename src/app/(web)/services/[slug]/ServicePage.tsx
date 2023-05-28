import { PageBuilderSerializer } from "@/components/pageBuilder/Serializers";
import { ServicePageSchema } from "../queries";
import z from "zod";

const ServicePage = ({ page }: { page: z.infer<typeof ServicePageSchema>[0] }) => {

  return ( 
    <main>
      <div>
        {page.name}
      </div>
      {page.pageBuilder.map((item, index) => (
        <PageBuilderSerializer component={item} />
      ))}
    </main>
   );
}
 
export default ServicePage;