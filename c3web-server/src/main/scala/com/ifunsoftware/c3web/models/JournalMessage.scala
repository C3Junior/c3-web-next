package com.ifunsoftware.c3web.models

/**
 * Created by alexander on 1/8/2016.
 */

import spray.json._

object JournalMessageEntryJson extends DefaultJsonProtocol {
  implicit val messageFormat = jsonFormat9(JournalMessage.apply)
}

case class JournalMessage(groupId: String, authorId: String, content: String, id: String,
                          attachedResources: List[String], messageType: String, parent: Option[String] = None, authorName: Option[String] = None, time: Option[String]) {

  override def toString = {
    val builder = new StringBuilder("Message{")
    builder.append("authorId=").append(authorId).
      append(", groupId=").append(groupId).
      append(", content=").append(content).
      append(", parent = ").append(parent).
      append("}")
    builder.toString()
  }
}