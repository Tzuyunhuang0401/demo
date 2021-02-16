package com.example.demo.entity;

    import com.baomidou.mybatisplus.annotation.TableName;
    import java.io.Serializable;
    import lombok.Data;
    import lombok.EqualsAndHashCode;
    import lombok.experimental.Accessors;

/**
* <p>
    * 
    * </p>
*
* @author hzy
* @since 2020-11-16
*/
    @Data
        @EqualsAndHashCode(callSuper = false)
    @Accessors(chain = true)
    @TableName("User")
    public class User implements Serializable {

    private static final long serialVersionUID = 1L;

    private String uuid;

    private String username;

    private String password;

    private String role;

    private String question;

    private String answer;

}
