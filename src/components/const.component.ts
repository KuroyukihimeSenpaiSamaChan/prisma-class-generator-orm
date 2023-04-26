import * as path from 'path'
import { FileComponent } from './file.component'
import { CONST_TEMPLATES } from '../templates/const.template'

export class ConstComponent extends FileComponent {
  private template: string

  constructor(output: string, filename: string, template: keyof typeof CONST_TEMPLATES) {
    super()
    this.dir = path.resolve(output)
    this.filename = filename
    this.template = CONST_TEMPLATES[template]
  }

  echo = () => {
    return this.template
  }
}
