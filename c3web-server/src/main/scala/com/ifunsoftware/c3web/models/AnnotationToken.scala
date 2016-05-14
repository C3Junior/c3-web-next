package com.ifunsoftware.c3web.models

import spray.json._
import spray.json.DefaultJsonProtocol._

object AnnotationTokenEntryJson extends DefaultJsonProtocol {
  implicit val annotationTokenResponseFormat = jsonFormat3(AnnotationToken.apply)

  implicit object AnnotationTokenListEntryJson extends RootJsonFormat[List[AnnotationToken]] {
    def write(list: List[AnnotationToken]) = JsArray(
      list.map(token => JsObject(
        "text" -> JsString(token.text),
        "weight" -> JsNumber(token.weight),
        "isUserDefined" -> JsBoolean(token.isUserDefined))))

    def read(json: JsValue) = {
      json match {
        case JsArray(elements) =>
          elements.map(element =>
            element.asJsObject.getFields("text", "weight", "isUserDefined") match {
              case Seq(JsString(word), JsNumber(weight), JsBoolean(isUserDefined)) => AnnotationToken(word, weight.toFloat, isUserDefined)
              case _ => deserializationError("Expected {text, weight, isUserDefined}")
            }).toList
        case _ => deserializationError("Expected array")
      }
    }
  }
}

case class AnnotationToken(text: String, weight: Float, isUserDefined: Boolean) {

}
