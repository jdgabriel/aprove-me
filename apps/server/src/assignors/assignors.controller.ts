import { AuthGuard } from '@/common/guards/auth.guard'
import { ZodValidationPipe } from '@/common/pipe/zod-validation.pipe'
import { Body, Controller, Post, UseGuards } from '@nestjs/common'
import { AssignorsService } from './assignors.service'
import {
  AssignorCreateSchema,
  assignorCreateSchema,
} from './dto/create.assignor'
import { AssignorPresenter } from './repository/presenters/assignor.presenter'

const createValidationPipe = new ZodValidationPipe(assignorCreateSchema)

@UseGuards(AuthGuard)
@Controller('assignor')
export class AssignorsController {
  constructor(private readonly assignorsService: AssignorsService) {}

  @Post()
  async create(@Body(createValidationPipe) body: AssignorCreateSchema) {
    const assignor = await this.assignorsService.create(body)
    return AssignorPresenter.toResponseHttp(assignor)
  }
}
