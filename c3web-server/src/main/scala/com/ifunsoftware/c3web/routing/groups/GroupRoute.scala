package com.ifunsoftware.c3web.routing.groups

import akka.actor.{ Actor, Props }
import com.ifunsoftware.c3web.models.Group
import com.ifunsoftware.c3web.models.GroupEntryJson._
import com.ifunsoftware.c3web.service.GroupService
import org.slf4j.LoggerFactory
import spray.http.StatusCodes
import spray.httpx.SprayJsonSupport
import spray.routing.HttpService

/**
 * Created by alexander on 04.11.15.
 */

/**
 * Factory method for Props configuration files for actors
 */
object GroupRoute {
  def props: Props = Props(new GroupRoute())
}

/**
 * Actor that handles requests that begin with "group" (certain group)
 */
class GroupRoute() extends Actor with GroupRouteTrait {
  def actorRefFactory = context

  def receive = runRoute(groupRoute)
}

/**
 * Separate routing logic in an HttpService trait so that the
 * routing logic can be tested outside of an actor system in specs/mockito tests
 */
trait GroupRouteTrait extends HttpService with SprayJsonSupport {

  val log = LoggerFactory.getLogger(classOf[GroupRouteTrait])
  val groupRoute = {
    get {
      pathEnd {
        complete(StatusCodes.NoContent)
      } ~
        path(JavaUUID) { groupUID =>
          log.debug(s"Hitting Get GROUP by Id:${groupUID}")
          val group = groupService.getGroupById(groupUID.toString)
          group match {
            case None        => complete(StatusCodes.NoContent)
            case Some(group) => complete(group)
          }
        }
    } ~
      (post & pathEnd) {
        entity(as[Group]) { group =>
          log.debug("posting to create a GROUP")
          val newGroup = groupService.addGroup(group)
          complete(newGroup)
        }
      } ~
      (put & path(LongNumber) & pathEnd) { groupId =>
        entity(as[Group]) { group =>
          log.debug(s"updating a GROUP with the id: ${groupId}")
          val updatedGroup = groupService.updateGroup(group)
          updatedGroup match {
            case true  => complete(StatusCodes.NoContent)
            case false => complete(StatusCodes.NotFound)
          }
        }
      }
  }
  private val groupService = GroupService
}

