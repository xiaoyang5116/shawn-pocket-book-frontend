import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { Popup } from "antd-mobile";
import { Tag, useGetTags, useTags } from "../../stores/tag.store";
import { Pay_Type } from "../../stores/bills.store";
import { useSetTag, useCurrentTag } from "../../stores/tag.store";

import styles from "./tag-popup.styles.module.scss";

export type TagPopupType = {
  tapPopupShow: () => void;
};

type TagButtonType = {
  name: string;
  className: string;
  onClick: () => void;
};

const TagButton = ({ onClick, name, className }: TagButtonType) => {
  return (
    <div onClick={onClick} className={className}>
      {name}
    </div>
  );
};

const TagPopup = forwardRef<TagPopupType>((props, ref) => {
  const tags = useTags();
  const currentTag = useCurrentTag();
  const setTag = useSetTag();
  const getTags = useGetTags();
  const [visible, setVisible] = useState(false);

  useImperativeHandle(ref, () => {
    return {
      tapPopupShow: () => setVisible(true),
    };
  });

  useEffect(() => {
    if (tags.length === 0) getTags();
  }, [tags, getTags]);

  const tagIdHandler = (tag: Tag) => {
    setVisible(false);
    setTag(tag);
  };

  return (
    <Popup
      visible={visible}
      showCloseButton
      onMaskClick={() => {
        setVisible(false);
      }}
      onClose={() => {
        setVisible(false);
      }}
      {...props}
    >
      <div className={styles.container}>
        <div className={styles.head}>请选择类型</div>
        <div className={styles.tagContainer}>
          <div className={styles.tags}>
            <TagButton
              onClick={() => tagIdHandler({ id: "all", name: "全部类型" })}
              className={
                currentTag.id === "all"
                  ? styles.tagButton_active
                  : styles.tagButton
              }
              name={"全部类型"}
            />
          </div>

          {tags.map((item) => {
            return (
              <div key={item.pay_type} className={styles.payTypeContainer}>
                <div className={styles.payType}>{Pay_Type[item.pay_type]}</div>
                <div className={styles.tags}>
                  {item.tags.map((tag) => (
                    <TagButton
                      key={tag.id}
                      onClick={() => tagIdHandler(tag)}
                      className={
                        currentTag.id === tag.id
                          ? styles.tagButton_active
                          : styles.tagButton
                      }
                      name={tag.name}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Popup>
  );
});

export default TagPopup;
