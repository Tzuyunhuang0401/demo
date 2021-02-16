package com.example.demo.entity;

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
    public class Item implements Serializable {

    private static final long serialVersionUID = 1L;

    private String cate;

    private String cid;

    private String name;

    private String price;

    private String description;
}
