import {validateImageName,initMaps,validateHeightWidth} from '../routes/api/utilities'
import fs from 'fs';
import path from 'path';
describe("this is a test for helper for validateImageName",()=>{
    
    it("start and test if validate correct input",()=>{
        initMaps()
    const files = fs.readdirSync(path.join(__dirname,'../../images'))
        for(let file of files){
            expect(validateImageName(file.slice(0,-4))).toBeTrue()
        }
    })
    it('Throws error for an invalid name',()=>{
        expect(()=>validateImageName('noimagevcanhavethisname')).toThrowError('Enter a valid image name')
    })
    
    
})


describe("this is a test for helper for validateHeightWidth",()=>{
    
    it("works for valid values",()=>{
        expect(validateHeightWidth('20','100')).toBeTrue();
    })
    it("height is numerical",()=>{
        expect(()=>validateHeightWidth('nn','100')).toThrowError('Height and width must be numbers');
    })
    it("width is numerical",()=>{
        expect(()=>validateHeightWidth('200','cc')).toThrowError('Height and width must be numbers');
    })
    it("height is greater than zero",()=>{
        expect(()=>validateHeightWidth('-2','100')).toThrowError('Enter a height and width value greater than zero');
    })
    it("width is greater than zero",()=>{
        expect(()=>validateHeightWidth('3','0')).toThrowError('Enter a height and width value greater than zero');
    })
    
})

