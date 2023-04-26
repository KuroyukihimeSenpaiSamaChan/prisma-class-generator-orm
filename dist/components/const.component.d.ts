import { FileComponent } from './file.component';
import { CONST_TEMPLATES } from '../templates/const.template';
export declare class ConstComponent extends FileComponent {
    private template;
    constructor(output: string, filename: string, template: keyof typeof CONST_TEMPLATES);
    echo: () => string;
}
