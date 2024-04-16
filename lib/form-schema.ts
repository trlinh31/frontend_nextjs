import z from 'zod';

export const ProductSchema = z.object({
  id: z.string(),
  name: z.string().min(1, { message: 'Vui lòng nhập tên sản phẩm' }),
  images: z.array(
    z.object({
      name: z.string(),
    })
  ),
  description: z.string().min(1, { message: 'Vui lòng nhập mô tả' }),
  importPrice: z.coerce.number({ invalid_type_error: 'Giá nhập không hợp lệ' }).min(1, { message: 'Vui lòng nhập giá nhập' }),
  price: z.coerce.number({ invalid_type_error: 'Đơn giá không hợp lệ' }).min(1, { message: 'Vui lòng nhập đơn giá' }),
  quantity: z.coerce.number({ invalid_type_error: 'Số lượng không hợp lệ' }),
  productCategories: z.array(z.string()),
});

export const UserSchema = z.object({
  id: z.string(),
  fullname: z.string().min(1, { message: 'Vui lòng nhập họ và tên' }),
  email: z.string().min(1, { message: 'Vui lòng nhập email' }).email({ message: 'Email không hợp lệ' }),
  address: z.string(),
  username: z.string().min(1, { message: 'Vui lòng nhập tên đăng nhập' }),
  password: z.string().min(6, { message: 'Mật khẩu phải có ít nhất 6 ký tự' }),
  roles: z.string().min(1, { message: 'Vui lòng chọn vai trò của user' }),
});

export const RoleSchema = z.object({
  id: z.string(),
  name: z.string().min(1, { message: 'Vui lòng nhập tên vai trò' }),
});

export type RoleSchemaType = z.TypeOf<typeof RoleSchema>;

export const GroupSchema = z.object({
  id: z.string(),
  name: z.string().min(1, { message: 'Vui lòng nhập tên nhóm' }),
  roles: z.array(z.number()),
});

export type GroupSchemaType = z.TypeOf<typeof GroupSchema>;

export const CategorySchema = z.object({
  id: z.string(),
  name: z.string().min(1, { message: 'Vui lòng nhập tên danh mục sản phẩm' }),
  parentsId: z.string(),
});

export type CategorySchemaType = z.TypeOf<typeof CategorySchema>;

export const LoginSchema = z.object({
  username: z.string().min(1, { message: 'Vui lòng nhập tên người dùng' }),
  password: z.string().min(6, { message: 'Mật khẩu phải có ít nhất 6 ký tự' }),
});

export const RegisterSchema = z
  .object({
    fullname: z.string().min(1, { message: 'Vui lòng nhập họ và tên' }),
    username: z.string().min(1, { message: 'Vui lòng nhập tên đăng nhập' }),
    password: z.string().min(6, { message: 'Mật khẩu phải có ít nhất 6 ký tự' }),
    confirmPassword: z.string().min(6, { message: 'Mật khẩu phải có ít nhất 6 ký tự' }),
  })
  .strict()
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: 'custom',
        message: 'Mật khẩu không khớp',
        path: ['confirmPassword'],
      });
    }
  });

export const CustomerSchema = z.object({
  id: z.string(),
  fullName: z.string().min(1, { message: 'Vui lòng nhập họ và tên' }),
  email: z.string().min(1, { message: 'Vui lòng nhập email' }).email({ message: 'Email không hợp lệ' }),
  address: z.string(),
  gender: z.string().min(1, { message: 'Vui lòng chọn giới tính' }),
  username: z.string().min(1, { message: 'Vui lòng nhập tên đăng nhập' }),
  password: z.string().min(6, { message: 'Mật khẩu phải có ít nhất 6 ký tự' }),
});

const TransactionDetailSchema = z.object({
  total: z.number(),
  quantity: z.number(),
  product: z.object({
    id: z.string(),
  }),
});

export const TransactionSchema = z.object({
  customer: z.object({
    username: z.string(),
  }),
  name: z.string().min(1, { message: 'Vui lòng nhập họ và tên' }),
  email: z.string().min(1, { message: 'Vui lòng nhập email' }).email({ message: 'Email không hợp lệ' }),
  address: z.string().min(1, { message: 'Vui lòng nhập địa chỉ nhận hàng' }),
  note: z.string(),
  transactionDetails: z.array(TransactionDetailSchema),
});

export const StockSchema = z.object({
  billInvoice: z.number(),
  stockInDetails: z.object({
    product: z.object({
      id: z.string(),
    }),
    quantity: z.number(),
    total: z.number(),
  }),
});

export type ProductSchemaType = z.TypeOf<typeof ProductSchema>;
export type UserSchemaType = z.TypeOf<typeof UserSchema>;
export type LoginSchemaType = z.TypeOf<typeof LoginSchema>;
export type RegisterSchemaType = z.TypeOf<typeof RegisterSchema>;
export type CustomerSchemaType = z.TypeOf<typeof CustomerSchema>;
export type TransactionSchemaType = z.TypeOf<typeof TransactionSchema>;
export type StockSchemaType = z.TypeOf<typeof StockSchema>;
