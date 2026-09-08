import { Component } from "../base/Component"


export class QuizzesPageView extends Component {
  constructor(container) {
    super(container)
    this._galleryContainer = this._container.querySelector('#gallery_container')
    this._galleryList = this._container.querySelector('.quizzes__list')
    this._containerNotFound = this._container.querySelector('#banner_not_found')
    this._buttonContainer = this._containerNotFound.querySelector('#button_to_generator')

    this._buttonContainer.addEventListener('click', () => {
      window.location.href = 'index.html'
    })
  }

  set content(items) {
    if (items.length) {
      this._galleryList.replaceChildren(...items)
      this._galleryContainer.style.display = 'grid'
      this._containerNotFound.style.display = 'none'
    }
    else {
      this._containerNotFound.style.display = 'grid'
      this._galleryContainer.style.display = 'none'
    }
  }
}