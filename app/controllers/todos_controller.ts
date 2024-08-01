import Todo from '#models/todo'
import type { HttpContext } from '@adonisjs/core/http'
import { DateTime } from 'luxon'

export default class TodosController {
  public async index({ response, request }: HttpContext) {
    const { isDeleted } = request.qs()
    if (isDeleted) {
      const todos = await Todo.query().whereNotNull('deleted_at')
      return response.json(todos)
    }
    const todos = await Todo.query().whereNull('deleted_at')
    return response.json(todos)
  }

  public async create({ request, response }: HttpContext) {
    const data = request.only(['title'])
    const todo = await Todo.create(data)
    return response.json(todo)
  }

  public async update({ request, response, params }: HttpContext) {
    const todo = await Todo.findOrFail(params.id)
    const data = request.only(['title', 'completed'])
    todo.merge(data)
    await todo.save()
    return response.json(todo)
  }

  public async softDelete({ response, params }: HttpContext) {
    const todo = await Todo.findOrFail(params.id)
    todo.deletedAt = DateTime.now()
    await todo.save()
    return response.json(todo)
  }

  public async restore({ response, params }: HttpContext) {
    const todo = await Todo.findOrFail(params.id)
    todo.deletedAt = null
    await todo.save()
    return response.json(todo)
  }

  public async delete({ response, params }: HttpContext) {
    const todo = await Todo.findOrFail(params.id)
    await todo.delete()
    return response.json({ message: 'Todo deleted successfully' })
  }
}
