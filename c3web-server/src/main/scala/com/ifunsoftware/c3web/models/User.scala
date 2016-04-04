package com.ifunsoftware.c3web.models

/**
 * Created by alexander on 24.10.15.
 */

import spray.json._

object UserEntryJson extends DefaultJsonProtocol {
  implicit val userFormat = jsonFormat5(User.apply)
}

case class User(id: String, username: String, password: String, firstname: String, lastname: String) {
  override def toString = {
    val builder = new StringBuilder()
    builder.append(firstname).append(" ")
      .append(lastname)
    builder.toString()
  }
}
