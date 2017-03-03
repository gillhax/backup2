package quiz.service.dto.admin;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import quiz.domain.Help;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class HelpAdminDto extends Help {

    String file;

}
