import { CommonModule } from '@angular/common';
import { Component, linkedSignal, signal } from '@angular/core';
import { MatMenuContent } from '@angular/material/menu';

interface Todo {
  id: number;
  title: string;
}

interface Address {
  id: number;
  title: string;
  fullAddress: string;
  isPrimary: boolean;
}

interface PaymentMethod {
  id: string;
  name: string;
  isDefault: boolean;
}

@Component({
  selector: 'app-test-linked-signal',
  imports: [CommonModule],
  templateUrl: './test-linked-signal.html',
  styleUrl: './test-linked-signal.css',
})
export class TestLinkedSignal {
  // دیتاهای فرضی ما
  todayList: Todo[] = [
    { id: 1, title: 'امروز: خرید نان' },
    { id: 2, title: 'امروز: رفتن به باشگاه' },
  ];

  tomorrowList: Todo[] = [
    { id: 10, title: 'فردا: جلسه کاری' },
    { id: 11, title: 'فردا: کد زدن انگولار' },
  ];

  // ۱. منبع اصلی داده که بین امروز و فردا سوییچ می‌شود
  todos = signal<Todo[]>(this.todayList);

  // ❌ روش سیگنال معمولی: مقدار اولیه را آیتم اول امروز می‌گذاریم
  normalSelectedTodo = signal<Todo | null>(this.todayList[0]);

  // ✅ روش سیگنال متصل: به سیگنال todos وصل شده است
  linkedSelectedTodo = linkedSignal<Todo[], Todo | null>({
    source: () => this.todos(),
    computation: (currentTodos) => currentTodos[0] || null,
  });

  // تغییر دیتای اصلی به کارهای امروز
  loadTodayTodos() {
    this.todos.set(this.todayList);
  }

  // تغییر دیتای اصلی به کارهای فردا
  loadTomorrowTodos() {
    this.todos.set(this.tomorrowList);
  }

  // کلیک کاربر روی لیست اول (معمولی)
  selectWithNormalSignal(todo: Todo) {
    this.normalSelectedTodo.set(todo);
  }

  // کلیک کاربر روی لیست دوم (linkedSignal)
  selectWithLinkedSignal(todo: Todo) {
    this.linkedSelectedTodo.set(todo);
  }
  /////////////////////////////////////////////////////

  // ۱. دیتای اصلی آدرس‌ها که از سرور آمده است
  userAddresses = signal<Address[]>([
    {
      id: 101,
      title: 'خانه (پیش‌فرض)',
      fullAddress: 'تهران، خیابان آزادی، کوچه مریم، پلاک ۴',
      isPrimary: true,
    },
    {
      id: 102,
      title: 'محل کار',
      fullAddress: 'تهران، بزرگراه ستاری، برج نگین، طبقه ۵',
      isPrimary: false,
    },
  ]);

  // ۲. دیتای اصلی روش‌های پرداخت که از سرور آمده است
  paymentMethods = signal<PaymentMethod[]>([
    { id: 'online', name: 'پرداخت آنلاین با کارت بانکی (پیش‌فرض)', isDefault: true },
    { id: 'wallet', name: 'استفاده از کیف پول الکترونیکی', isDefault: false },
    { id: 'cod', name: 'پرداخت در محل (Cash on Delivery)', isDefault: false },
  ]);

  // ==========================================
  // پیاده‌سازی هوشمند آدرس انتخابی با linkedSignal
  // ==========================================
  selectedAddress = linkedSignal<Address[], Address | null>({
    source: () => this.userAddresses(),
    computation: (addresses) => {
      // پیدا کردن آدرس اصلی به عنوان پیش‌فرض، اگر نبود اولین آدرس را بردار
      return addresses.find((a) => a.isPrimary) || addresses[0] || null;
    },
  });

  // ==========================================
  // پیاده‌سازی هوشمند روش پرداخت با linkedSignal
  // ==========================================
  selectedPaymentMethod = linkedSignal<PaymentMethod[], PaymentMethod | null>({
    source: () => this.paymentMethods(),
    computation: (methods) => {
      // پیدا کردن روش پیش‌فرض
      return methods.find((m) => m.isDefault) || methods[0] || null;
    },
  });

  // کلیک دستی کاربر روی یک آدرس
  selectAddressManually(address: Address) {
    this.selectedAddress.set(address);
  }

  // کلیک دستی کاربر روی یک روش پرداخت
  selectPaymentManually(method: PaymentMethod) {
    this.selectedPaymentMethod.set(method);
  }

  // شبیه‌سازی لود مجدد اطلاعات از سرور (مثلاً تغییر آدرس اصلی توسط کاربر در پشت صحنه)
  simulateDataRefresh() {
    // فرض کنید دیتای جدیدی از سرور می‌رسد که در آن آدرس اصلی کاربر تغییر کرده است
    this.userAddresses.set([
      {
        id: 201,
        title: 'خانه جدید و اصلی',
        fullAddress: 'شیراز، بلوار ارم، کوچه ۳، پلاک ۱۲',
        isPrimary: true,
      },
      {
        id: 102,
        title: 'محل کار همچنان ثابت',
        fullAddress: 'تهران، بزرگراه ستاری، برج نگین، طبقه ۵',
        isPrimary: false,
      },
    ]);

    // متد پرداخت هم شبیه‌سازی آپدیت می‌شود
    this.paymentMethods.set([
      { id: 'online', name: 'پرداخت آنلاین با کارت بانکی (پیش‌فرض)', isDefault: true },
      { id: 'wallet', name: 'استفاده از کیف پول الکترونیکی', isDefault: false },
    ]);
  }
}
