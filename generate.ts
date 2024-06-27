import { quicktype, InputData, jsonInputForTargetLanguage } from "quicktype-core";
import { writeFile } from 'fs/promises';

export async function generateTypes(jsonString: string) {
    console.log('generate types')

    try {
        const jsonInput = jsonInputForTargetLanguage("typescript");

        await jsonInput.addSource({
            name: "TranslationInterface",
            samples: [jsonString]
        });

        const inputData = new InputData();
        inputData.addInput(jsonInput);

        const data = JSON.parse(jsonString);
        console.log(data)

        console.log('AAAAAA')
    
        const result = await quicktype({
            inputData,
            alphabetizeProperties: true,
            lang: "typescript",
            rendererOptions: {
                'just-types': true,
            }
        });
        console.log('after generating');
    
    
        console.log(result);
    
        // console.log(result.lines.join("\n"));
        const outputPath = './translationTypes.ts';
        await writeFile(outputPath, result.lines.join("\n"));
        console.log(`Types have been written to ${outputPath}`);
    
    } catch (e) {
        console.log(e)
    }
}

// generateTypes(); 
