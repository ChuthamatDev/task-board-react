export type Language = 'en' | 'th'

export type TranslationKey =
    | 'app_title'
    | 'app_sub'
    // Actions (ปุ่มต่างๆ)
    | 'btn_new_task'
    | 'btn_edit'
    | 'btn_delete'
    | 'btn_confirm'
    | 'btn_cancel'
    | 'btn_save'
    | 'btn_refresh'
    // Form Labels (หัวข้อในฟอร์ม)
    | 'label_title'
    | 'label_desc'
    | 'label_priority'
    | 'placeholder_title'
    | 'placeholder_desc'
    | 'placeholder_search'
    // Dialogs (ข้อความยืนยัน)
    | 'dialog_del_title'
    | 'dialog_del_desc'
    // Status (สถานะงาน)
    | 'status_draft'
    | 'status_todo'
    | 'status_doing'
    | 'status_done'
    // Empty States (ตอนไม่มีข้อมูล)
    | 'empty_col'
    | 'drop_here'
    // Alerts (แจ้งเตือน)
    | 'alert_create_success'
    | 'alert_delete_success'
    | 'alert_update_success'
    // Column
    | 'btn_new_column'
    | 'column_title'
    | 'column_select_color'
    | 'column_edit'
    | 'column_delete'
    // Priority
    | 'priority_low'
    | 'priority_medium'
    | 'priority_high'
    | 'option_all'
    | 'login'
    | 'register'
    | 'logout'
    | 'add_column'

export const translations: Record<Language, Record<TranslationKey, string>> = {
    en: {
        app_title: 'TaskBoard',
        app_sub: 'Manage your team tasks',
        btn_new_task: 'New Task',
        btn_edit: 'Edit',
        btn_delete: 'Delete',
        btn_confirm: 'Confirm',
        btn_cancel: 'Cancel',
        btn_save: 'Save',
        btn_refresh: 'Refresh',
        label_title: 'Task Title',
        label_desc: 'Description',
        label_priority: 'Priority Level',
        placeholder_title: 'What needs to be done?',
        placeholder_desc: 'Add more details...',
        placeholder_search: 'Search tasks...',
        dialog_del_title: 'Delete this task?',
        dialog_del_desc: 'This action cannot be undone. Are you sure?',
        status_draft: 'Draft',
        status_todo: 'To Do',
        status_doing: 'In Progress',
        status_done: 'Completed',
        empty_col: 'No tasks yet',
        drop_here: 'Drop task here!',
        alert_create_success: 'New task created!',
        alert_delete_success: 'Task deleted successfully.',
        alert_update_success: 'Changes saved!',
        btn_new_column: 'Add New Column',
        column_title: 'Enter column title...',
        column_select_color: 'Select color:',
        column_edit: 'Edit Column',
        column_delete: 'Delete Column',
        priority_low: 'Low',
        priority_medium: 'Medium',
        priority_high: 'High',
        option_all: 'All Priorities',
        login: 'Successfully logged in',
        register: 'Created account successfully',
        logout: 'Logout',
        add_column: 'Add Column',
    },
    th: {
        app_title: 'บอร์ดงาน',
        app_sub: 'บริหารจัดการงานของทีมของคุณ',
        btn_new_task: 'เพิ่มงานใหม่',
        btn_edit: 'แก้ไข',
        btn_delete: 'ลบ',
        btn_confirm: 'ยืนยันการลบ',
        btn_cancel: 'ยกเลิก',
        btn_save: 'บันทึกการแก้ไข',
        btn_refresh: 'รีเฟรช',
        label_title: 'ชื่องาน',
        label_desc: 'รายละเอียด',
        label_priority: 'ระดับความสำคัญ',
        placeholder_title: 'มีอะไรต้องทำบ้าง?',
        placeholder_desc: 'ใส่รายละเอียดเพิ่มเติม...',
        placeholder_search: 'ค้นหางาน...',
        dialog_del_title: 'ลบงานนี้?',
        dialog_del_desc: 'คุณแน่ใจนะ? ลบแล้วกู้คืนไม่ได้นะครับ',
        status_draft: 'แบบร่าง',
        status_todo: 'สิ่งที่ต้องทำ',
        status_doing: 'กำลังลุย',
        status_done: 'เสร็จแล้ว',
        empty_col: 'ยังไม่มีงาน',
        drop_here: 'วางงานที่นี่!',
        alert_create_success: 'สร้างงานใหม่แล้ว!',
        alert_delete_success: 'ลบงานเรียบร้อย',
        alert_update_success: 'บันทึกเรียบร้อย!',
        btn_new_column: 'เพิ่มคอลัมน์ใหม่',
        column_title: 'ชื่อคอลัมน์',
        column_select_color: 'เลือกสี',
        column_edit: 'แก้ไขคอลัมน์',
        column_delete: 'ลบคอลัมน์',
        priority_low: 'ต่ำ',
        priority_medium: 'ปานกลาง',
        priority_high: 'สูง',
        option_all: 'ทั้งหมด',
        login: 'ล็อกอิน เข้าสู่ระบบสำเร็จ',
        register: 'สมัครสมาชิกสำเร็จ',
        logout: 'ออกจากระบบ',
        add_column: 'เพิ่มคอลัมน์',
    },
}
