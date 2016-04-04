package com.ifunsoftware.c3web.service

import java.util.UUID

import com.ifunsoftware.c3web.data.{JournalMessagesData}
import com.ifunsoftware.c3web.models.{JournalMessage}
import spray.routing.RequestContext
import sun.applet.resources.MsgAppletViewer

/**
  * Created by alexander on 1/8/2016.
  */
object JournalMessagesService {

  import JournalMessagesData.messagesMock

  private val userService = UserService

  def getMessages: List[JournalMessage] = {
    val journalMessages = messagesMock.toList
    journalMessages.map(msg => {
      val userName = userService.getUserById(msg.authorId) match {
        case Some(user) => Option(user.toString)
        case None => Option("unknown")
      }
      val newMessage = msg.copy(authorName = userName)
      updateMessage(newMessage)
    }
    )
    journalMessages.toList
  }

  def addMessage(message: JournalMessage): JournalMessage = {
    val maxId = UUID.randomUUID();
    val newmessage = message.copy(id = maxId.toString)
    messagesMock += newmessage
    newmessage
  }

  def updateMessage(message: JournalMessage): Boolean = {
    messagesMock.indexWhere(_.id == message.id) match {
      case -1 => false
      case i => messagesMock.update(i, message); true
    }
  }

  def deleteMessage(id: String): Unit = {
    getMessageById(id) match {
      case Some(message) => messagesMock -= message
      case None       =>
    }
  }

  def getMessageById(id: String): Option[JournalMessage] = {
    messagesMock find (_.id == id)
  }

  def getMessageForGroupById(id: String): List[JournalMessage] = {
    val journalMessages = messagesMock filter (_.groupId == id)
    journalMessages.map(msg => {
      val userName = userService.getUserById(msg.authorId) match {
        case Some(user) => Option(user.toString)
        case None => Option("unknown")
      }
      val newMessage = msg.copy(authorName = userName)
      updateMessage(newMessage)
    }
    )
    journalMessages.toList
  }
}
