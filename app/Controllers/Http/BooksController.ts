import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import  Book  from 'App/Models/Book'

export default class BooksController {


  public async store({ request }: HttpContextContract) {
    const book = new Book()
    book.title = request.input('title')
    book.author = request.input('author')
    await book.save()
    return {
      "libro": book,
      "msg": "Libro registrado con exito",
      "status": 200
    }
  }

  public async index(){
    const book = await Book.query()
    return book
  }

  public async show({ params }: HttpContextContract){
    try{
      const book = await Book.find(params.id)
      if(book){
        return book
      }else{
        return {
          "msg": "Libro no encontrado",
          "status": 404
        }
      }
    }catch(e){
      console.log(e)

    }
  }


  public async update({ request, params }: HttpContextContract){
    const book = await Book.find(params.id)
    if(book){
      book.title = request.input('title')
      book.author = request.input('author')
      if(await book.save()){
        return {
          "msg": "Libro actualizado con exito",
          "status": 200
        }
      }else{
        return {
          "msg": "Error al actualizar el libro",
          "status": 401
        }
      }
    }
    return {
      "msg": "Libro no encontrado",
      "status": 404
    }

  }
}
