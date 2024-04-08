import z from 'zod';

export const ProductSchema = z.object({
  id: z.string(),
  name: z.string({ required_error: 'Vui lòng nhập tên sản phẩm' }).min(3, { message: 'Tên sản phẩm phải có ít nhất 3 ký tự' }),
  images: z.array(
    z.object({
      name: z.string(),
    })
  ),
  description: z.string({ required_error: 'Vui lòng nhập mô tả' }).min(3, { message: 'Mô tả phải có ít nhất 3 ký tự' }),
  importPrice: z.coerce.number({ invalid_type_error: 'Giá nhập không hợp lệ', required_error: 'Vui lòng nhập giá nhập' }),
  price: z.coerce.number({ invalid_type_error: 'Đơn giá không hợp lệ', required_error: 'Vui lòng nhập đơn giá' }),
  quantity: z.coerce.number({ invalid_type_error: 'Số lượng không hợp lệ', required_error: 'Vui lòng nhập số lượng' }),
  productCategories: z.array(z.number()),
  // supplier: z.string({ required_error: 'Vui lòng nhập nhà cung cấp' }).min(3, { message: 'Tên nhà cung cấp phải có ít nhất 3 ký tự' }),
});

export type ProductSchemaType = z.TypeOf<typeof ProductSchema>;

const phoneRegex = new RegExp(/([\+84|84|0]+(3|5|7|8|9|1[2|6|8|9]))+([0-9]{8})\b/);

export const UserSchema = z.object({
  id: z.string(),
  fullname: z.string({ required_error: 'Vui lòng nhập họ và tên' }).min(3, { message: 'Họ và tên phải có ít nhất 3 ký tự' }),
  email: z.string({ required_error: 'Vui lòng nhập email' }).email({ message: 'Email không hợp lệ' }),
  phone: z.string().regex(phoneRegex, 'Số điện thoại không hợp lệ'),
  address: z.string({ required_error: 'Vui lòng nhập địa chỉ' }).min(3, { message: 'Địa chỉ phải có ít nhất 3 ký tự' }),
  username: z.string({ required_error: 'Vui lòng nhập tên đăng nhập' }).min(3, { message: 'Tên đăng nhập phải có ít nhất 3 ký tự' }),
  password: z.string({ required_error: 'Vui lòng nhập mật khẩu' }).min(6, { message: 'Mật khẩu phải có ít nhất 6 ký tự' }),
  roles: z.number(),
});

export type UserSchemaType = z.TypeOf<typeof UserSchema>;

export const CategorySchema = z.object({
  id: z.string(),
  name: z.string({ required_error: 'Vui lòng nhập tên danh mục sản phẩm' }).min(3, { message: 'Tên danh mục sản phẩm phải có ít nhất 3 ký tự' }),
  parentsId: z.string(),
});

export type CategorySchemaType = z.TypeOf<typeof CategorySchema>;

export const LoginSchema = z.object({
  username: z.string({ required_error: 'Vui lòng nhập tên người dùng' }).min(3, { message: 'Tên người dùng phải có ít nhất 3 ký tự' }),
  password: z.string({ required_error: 'Vui lòng nhập mật khẩu' }).min(6, { message: 'Mật khẩu phải có ít nhất 6 ký tự' }),
});

export type LoginSchemaType = z.TypeOf<typeof LoginSchema>;

export const RegisterSchema = z
  .object({
    fullname: z.string({ required_error: 'Vui lòng nhập họ và tên' }).min(3, { message: 'Họ và tên phải có ít nhất 3 ký tự' }),
    username: z.string({ required_error: 'Vui lòng nhập tên đăng nhập' }).min(3, { message: 'Tên đăng nhập phải có ít nhất 3 ký tự' }),
    password: z.string({ required_error: 'Vui lòng nhập mật khẩu' }).min(6, { message: 'Mật khẩu phải có ít nhất 6 ký tự' }),
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

export type RegisterSchemaType = z.TypeOf<typeof RegisterSchema>;
