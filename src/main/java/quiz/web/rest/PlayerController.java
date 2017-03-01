package quiz.web.rest;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.security.access.annotation.Secured;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import quiz.service.PlayerService;
import quiz.service.UserService;
import quiz.service.dto.PlayerDtoIn;
import quiz.service.dto.PlayerDtoOut;
import quiz.system.error.handler.dto.ResponseDto;
import quiz.system.util.StaticWrapper;

import static quiz.security.SecurityUtils.getCurrentUserId;

@RestController
@RequestMapping({"/api/v1/"})
@Api(
   tags = {"Players"}
)
public class PlayerController {

    private final UserService userService;

    private final PlayerService playerService;

    public PlayerController(UserService userService, PlayerService playerService) {
        this.userService = userService;
        this.playerService = playerService;
    }

    @Secured({"ROLE_ADMIN", "ROLE_USER"})
   @RequestMapping(
      value = {"/players/{id}"},
      method = {RequestMethod.GET}
   )
   @ApiOperation(
      value = "Get player information by id",
      response = PlayerDtoOut.class
   )
   public ResponseDto getPlayerById(@PathVariable Long id) {
      return StaticWrapper.wrap(this.playerService.getPlayerById(id));
   }

   @Secured({"ROLE_USER"})
   @RequestMapping(
      value = {"/players/profile"},
      method = {RequestMethod.GET}
   )
   @ApiOperation(
      value = "Get my profile",
      response = PlayerDtoOut.class
   )
   public ResponseDto getProfile() {
       return StaticWrapper.wrap(this.playerService.getPlayerById(getCurrentUserId()));
   }

   @Secured({"ROLE_USER"})
   @RequestMapping(
      value = {"/players/profile"},
      method = {RequestMethod.PUT}
   )
   @ApiOperation(
      value = "Update my profile",
      response = PlayerDtoOut.class
   )
   public ResponseDto updateProfile(@RequestBody @Validated PlayerDtoIn playerDtoIn) {
       return StaticWrapper.wrap(this.playerService.updatePlayer(getCurrentUserId(), playerDtoIn));
   }

   @RequestMapping(
      value = {"/players/top"},
      method = {RequestMethod.GET}
   )
   @ApiOperation(
      value = "Get top 50 players",
      response = PlayerDtoOut.class
   )
   public ResponseDto getPlayersTop() {
       Long userId = getCurrentUserId();
      return StaticWrapper.wrap(this.playerService.getPlayersTop(userId));
   }

   @Secured({"ROLE_USER"})
   @RequestMapping(
      value = {"/players/profile/score"},
      method = {RequestMethod.GET}
   )
   @ApiOperation(
      value = "Get my score",
      response = Long.class
   )
   public ResponseDto getProfileScore() {
       return StaticWrapper.wrap(this.playerService.getProfileScore(getCurrentUserId()));
   }
}
