import PDFMerger from 'pdf-merger-js';
import { join } from "path";

const mergePDFs = async (files: any) => {
    try {
        const merger = new PDFMerger()
        for (const file of files) {
            await merger.add(file.path)
        }
        await merger.save(`${join(process.cwd() + "/src/uploads/merged")}/merged.pdf`);
        return "File Merged Successfully !!!"
    } catch (error) {
        console.log("File Merge Helper Error : ",error);
    }
}

export default mergePDFs